import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [...nextVitals]

eslintConfig.push({
  ignores: ['payload-types.ts'],
})

export default eslintConfig
