const GlassPanel = ({ children }) => {
    return (
        <div className="
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            rounded-2xl
            p-8
            shadow-lg
            max-w-2xl
        ">
            { children }
        </div>
    );
};

export default GlassPanel;