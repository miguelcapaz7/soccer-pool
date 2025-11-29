import MainLayout from "../layouts/MainLayout";
import RulesData from "../data/RulesData";

const Rules = () => {
  return (
    <MainLayout title="Rules">
      {RulesData.map((section, index) => (
        <section key={index} className="mb-4">
          <h4 className="mb-3"><u>{section.title}</u></h4>
          <div style={{textAlign: "justify"}}>{section.content}</div>
        </section>
      ))}
    </MainLayout>
  );
};

export default Rules;