import MainLayout from "../layouts/MainLayout";
import RulesData from "../data/RulesData";

const Rules = () => {
  return (
    <MainLayout title="Rules">
      {RulesData.map((section, index) => (
        <section className="mb-4">
          <h4 className="mb-3"><u>{section.title}</u></h4>
          <div className="text-start">{section.content}</div>
        </section>
      ))}
    </MainLayout>
  );
};

export default Rules;