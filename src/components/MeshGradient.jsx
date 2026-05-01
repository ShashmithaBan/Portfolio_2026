export default function MeshGradient({ isDark }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {isDark ? (
        <>
          <div className="absolute -top-[30%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#F58840]/[0.07] blur-[120px] animate-mesh-blob-1" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#B85252]/[0.06] blur-[120px] animate-mesh-blob-2" />
          <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-purple-900/[0.04] blur-[100px] animate-mesh-blob-3" />
        </>
      ) : (
        <>
          <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-slate-300/20 blur-[120px] animate-mesh-blob-1" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-slate-400/10 blur-[100px] animate-mesh-blob-2" />
        </>
      )}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
