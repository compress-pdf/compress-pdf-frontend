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
//     // New rule to enforce issue reference
//     'references-empty': [2, 'never'],
//     'footer-max-line-length': [2, 'always', 100],
//     'footer-leading-blank': [2, 'always'],
//     'footer-full-stop': [0, 'always', '.'],
//     'footer-reference-format': [
//       2,
//       'always',
//       /#\d+\)$/, // Regex to enforce the format (#123) at the end of the subject line
//     ],
//   },
// };
