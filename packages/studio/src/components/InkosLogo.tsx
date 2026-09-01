// InkOS 品牌 logo（与 README 顶部 assets/logo.svg 同款）：深色圆底 + 橙色墨滴 + 羽毛笔尖。
// 内联为组件，避免 Vite 静态资源/类型声明依赖。渐变 id 加 inkos- 前缀防全局冲突。
export function InkosLogo({ className }: { readonly className?: string }) {
  return (
    <img src="/logo-yunxi-icon.png" className={className} alt="云溪" />
  );
}
