const RulesLayout = ({ title, children }) => {
  return (
    <section className="mb-4">
      <h4 className="mb-3"><u>{title}</u></h4>
      <div className="text-start">{children}</div>
    </section>
  );
};

export default RulesLayout;