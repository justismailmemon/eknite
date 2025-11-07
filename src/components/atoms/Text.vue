<!-- \src\components\atoms\Text.vue -->
<template>
  <component
    :is="tag"
    :class="`
      ${sizeClasses[size] || ''}
      ${weightClasses[weight] || ''}
      ${colorClasses[color] || ''}
      ${customClass}
    `"
  >
    <slot />
  </component>
</template>

<script setup>

const props = defineProps({
  tag: { type: String, default: 'p' }, // h1, h2, h3, p, span...
  size: { type: String, default: 'base' }, // sm, base, lg, xl, 2xl, 3xl...
  weight: { type: String, default: 'normal' }, // thin, normal, bold...
  color: { type: String, default: 'gray-800' }, // Tailwind color classes
  customClass: { type: String, default: '' } // extra custom classes
})

const sizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
}

const weightClasses = {
  thin: 'font-thin',
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

const colorClasses = {
  'gray-800': 'text-gray-800',
  'gray-500': 'text-gray-500',
  'blue-500': 'text-blue-500',
  'red-500': 'text-red-500',
  'green-500': 'text-green-500',
  white: 'text-white',
}
</script>
