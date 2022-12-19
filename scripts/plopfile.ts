/* eslint-disable  import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop';
import path from 'path';

export default function(plop: NodePlopAPI) {
    plop.setGenerator('component', {
        description: 'Generate a component scaffold',
        prompts: [
            { type: 'input', name: 'name', message: 'Enter component name:' },
            // { type: 'input', name: 'CN', message: '请输入组件中文名称' },
            { type: 'input', name: 'description', message: 'Enter component description:' },
        ],
        actions: [
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/index.ts'),
                templateFile: path.resolve(__dirname, '../templates/component/index.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/{{kebabCase name}}.tsx'),
                templateFile: path.resolve(__dirname, '../templates/component/comp.hbs'),
            },
            // we're not going to use less/css for now
            // {
            //     type: 'add',
            //     path: path.resolve(__dirname, '../components/{{kebabCase name}}/style/index.less'),
            //     templateFile: path.resolve(__dirname, '../templates/component/style/style.hbs'),
            // },
            // {
            //     type: 'add',
            //     path: path.resolve(__dirname, '../components/{{kebabCase name}}/style/index.ts'),
            //     templateFile: path.resolve(__dirname, '../templates/component/style/index.hbs'),
            // },
            // {
            //     type: 'add',
            //     path: path.resolve(__dirname, '../components/{{kebabCase name}}/index.mdx'),
            //     templateFile: path.resolve(__dirname, '../templates/component/doc.hbs'),
            // },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/interface.ts'),
                templateFile: path.resolve(__dirname, '../templates/component/interface.hbs'),
            },
            // {
            //     type: 'add',
            //     path: path.resolve(__dirname, '../components/{{kebabCase name}}/demo/basic.tsx'),
            //     templateFile: path.resolve(__dirname, '../templates/component/demo/basic.hbs'),
            // },
            {
                type: 'add',
                path: path.resolve(__dirname, '../stories/{{kebabCase name}}/{{pascalCase name}}.stories.tsx'),
                templateFile: path.resolve(__dirname, '../templates/component/demo/story.hbs'),
            },
            // we don't have unit tests for components for now
            // {
            //     type: 'add',
            //     path: path.resolve(__dirname, '../components/{{kebabCase name}}/__tests__/index.test.tsx'),
            //     templateFile: path.resolve(__dirname, '../templates/component/__tests__/index.test.hbs'),
            // },
            {
                type: 'append',
                path: path.resolve(__dirname, '../components/index.ts'),
                pattern: '/* PLOP_INJECT_EXPORT */',
                template: "export { default as {{pascalCase name}} } from './{{kebabCase name}}';",
            },
        ],
    });
}
