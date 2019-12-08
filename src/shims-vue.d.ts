declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    // Augmentation to allow css-modules in .vue files:
    $style: { [key: string]: string };
  }
}
