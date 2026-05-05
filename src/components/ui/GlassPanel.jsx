const GlassPanel = ({ children }) => {
    return (
        <div className="
            bg-black/40
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-8
            shadow-[0_0_40px_rgba(0, 255, 255, 0.1)]
            max-w-xl
        ">
            { children }
        </div>
    );
};

export default GlassPanel;