function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      features: ["Basic AI Chat", "Limited Questions", "Community Support"],
    },
    {
      name: "Pro",
      price: "₹1499",
      features: ["Unlimited AI Chat", "AI Mentor", "Mock Tests", "PDF Notes"],
    },
    {
      name: "Premium Plus",
      price: "₹2199",
      features: [
        "Everything in Pro",
        "Voice AI",
        "Personal Study Plan",
        "Priority Support",
      ],
    },
  ];

  return (
    <section style={{ padding: "60px 40px", textAlign: "center" }}>
      <h2 style={{ fontSize: "36px", marginBottom: "30px" }}>
        Pricing Plans
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "16px",
            }}
          >
            <h3>{plan.name}</h3>
            <h2>{plan.price}</h2>
            {plan.features.map((feature) => (
              <p key={feature}>✅ {feature}</p>
            ))}
            <button style={{ marginTop: "15px", padding: "10px 20px" }}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;