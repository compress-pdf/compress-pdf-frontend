module.exports = {
  rules: {
    'header-max-length': [0], // Disable the max length check
    'subject-case': [0], // Disable the subject case check
    'type-case': [0], // Disable the type case check
    'type-enum': [0], // Disable the type enumeration check
  },
};

// module.exports = {
//   extends: ['@commitlint/config-conventional'],

//   rules: {
//     'header-max-length': [2, 'always', 70],

//     'subject-case': [2, 'always', 'lower-case'],

//     'type-case': [2, 'always', 'lower-case'],

//     'type-enum': [
//       2,

//       'always',

//       [
//         'feat',

//         'fix',

//         'docs',

//         'style',

//         'refactor',

//         'perf',

//         'test',

//         'chore',

//         'revert',
//       ],
//     ],
//   },
// };
