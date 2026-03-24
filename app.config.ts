export default defineAppConfig({
  ui: {
    colors: { primary: 'blue', neutral: 'slate' },
    navigationMenu: {
      variants: {
        orientation: {
          vertical: {
            root: 'w-full',
            item: 'w-full',
            link: 'w-full rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors data-[state=open]:bg-slate-100 hover:bg-slate-50 active:bg-slate-100',
            childList: 'mt-1 ml-3 pl-3 border-l border-slate-200 space-y-0.5',
            childLink: 'w-full rounded-lg px-3 py-2 text-sm hover:bg-slate-50 active:bg-slate-100',
          },
        },
      },
    },
  },
})
