// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateTemplateFiles, CaseConverterEnum } = require('generate-template-files');

generateTemplateFiles([
    {
        option: 'Create simple fragment',
        defaultCase: CaseConverterEnum.PascalCase,
        entry: {
            folderPath: './generator/templates/simple-fragment/',
        },
        stringReplacers: [{ question: 'Insert fragment name', slot: '__FragmentName__' }],
        output: {
            path: './src/fragments/__FragmentName__',
            pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
            overwrite: true,
        },
    },
    {
        option: 'Create simple component',
        defaultCase: CaseConverterEnum.PascalCase,
        entry: {
            folderPath: './generator/templates/simple-component/',
        },
        stringReplacers: [{ question: 'Insert component name', slot: '__ComponentName__' }],
        output: {
            path: './src/components/__ComponentName__',
            pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
            overwrite: true,
        },
    },
]).finally();
