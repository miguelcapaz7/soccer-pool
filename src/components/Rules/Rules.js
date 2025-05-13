import RulesLayout from "./RulesLayout";
import RulesContent from "./RulesContent";

const Rules = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Rules</h2>
      {RulesContent.map((section, index) => (
        <RulesLayout key={index} title={section.title}>
          {section.content}
        </RulesLayout>
      ))}
    </div>
  );
};

export default Rules;
