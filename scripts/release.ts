/* eslint-disable  import/no-extraneous-dependencies,@typescript-eslint/camelcase, no-console */
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import util from 'util';
import chalk from 'chalk';
import semverInc from 'semver/functions/inc';
import { ReleaseType } from 'semver';

import pkg from '../package.json';

const exec = util.promisify(child_process.exec);

const run = async (command: string) => {
    console.log(chalk.green(command));
    await exec(command);
};

const currentVersion = pkg.version;

const getNextVersions = (): { [key in ReleaseType]: string | null } => ({
    major: semverInc(currentVersion, 'major'),
    minor: semverInc(currentVersion, 'minor'),
    patch: semverInc(currentVersion, 'patch'),
    premajor: semverInc(currentVersion, 'premajor'),
    preminor: semverInc(currentVersion, 'preminor'),
    prepatch: semverInc(currentVersion, 'prepatch'),
    prerelease: semverInc(currentVersion, 'prerelease'),
});

const timeLog = (logInfo: string, type: 'start' | 'end') => {
    let info = '';
    if (type === 'start') {
        info = `=> Start Job：${logInfo}`;
    } else {
        info = `✨ End Job：${logInfo}`;
    }
    const nowDate = new Date();
    console.log(
        `[${nowDate.toLocaleString()}.${nowDate
            .getMilliseconds()
            .toString()
            .padStart(3, '0')}] ${info}
    `,
    );
};

/**
 * obtain next version
 */
async function prompt(): Promise<string> {
    const nextVersions = getNextVersions();
    const { nextVersion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nextVersion',
            message: `Please choose a version to release (Current version is ${currentVersion})`,
            choices: (Object.keys(nextVersions) as Array<ReleaseType>).map(level => ({
                name: `${level} => ${nextVersions[level]}`,
                value: nextVersions[level],
            })),
        },
    ]);
    return nextVersion;
}

/**
 *
 * @param nextVersion
 */
async function updateVersion(nextVersion: string) {
    pkg.version = nextVersion;
    timeLog('Modify version in package.json', 'start');
    await fs.writeFileSync(path.resolve(__dirname, './../package.json'), JSON.stringify(pkg));
    await run('npx prettier package.json --write');
    timeLog('Modify version in package.json', 'end');
}

async function generateChangelog() {
    timeLog('Generate CHANGELOG.md', 'start');
    await run(' npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0');
    timeLog('Generate CHANGELOG.md', 'end');
}

/**
 * push ot git
 */
async function push(nextVersion: string) {
    timeLog('Push code to git repo', 'start');
    await run('git add package.json CHANGELOG.md');
    await run(`git commit -m "v${nextVersion}" -n`);
    await run(`git push --set-upstream origin release/${nextVersion}`);
    timeLog('Push code to git repo', 'end');
}

/**
 * build comonent library
 */
async function build() {
    timeLog('Build component library', 'start');
    await run('npm run build');
    timeLog('Build component library', 'end');
}

/**
 * publish to npm
 */
async function publish() {
    timeLog('publish component library', 'start');
    await run('npm publish');
    timeLog('publish component library', 'end');
}

/**
 * Add tag and push to git repo
 */
async function tag(nextVersion: string) {
    timeLog('Add tag and push to git repo', 'start');
    await run(`git tag v${nextVersion}`);
    await run(`git push origin tag v${nextVersion}`);
    timeLog('Add tag and push to git repo', 'end');
}

async function generateReleaseBranch(version: string) {
    const releaseBranch = `release/${version}`
    timeLog(`Create a release branch ${releaseBranch}`, 'start');
    await run(`git checkout -b ${releaseBranch}`);
    timeLog(`Create a release branch ${releaseBranch}`, 'end');
}

async function main() {
    try {
        const nextVersion = await prompt();
        const startTime = Date.now();
        // =================== create release branch ===================
        await generateReleaseBranch(nextVersion);
        // =================== update version ===================
        await updateVersion(nextVersion);
        // =================== generate changelog ===================
        // await generateChangelog();
        // =================== push code to GIT repo ===================
        await push(nextVersion);
        // =================== build component library ===================
        // await build();
        // =================== publish to npm ===================
        await publish();
        // =================== add tag and push to npm ===================
        await tag(nextVersion);
        console.log(`✨ Release process end, time cost: ${((Date.now() - startTime) / 1000).toFixed(3)}s`);
    } catch (error) {
        console.log('💣 Release failed，reason：', error);
    }
}

main();
