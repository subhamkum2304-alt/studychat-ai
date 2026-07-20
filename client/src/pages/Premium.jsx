import { useNavigate } from "react-router-dom";

function Premium() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "₹0",
      color: "border-slate-700",
      features: [
        "20 AI Chats / Day",
        "Basic AI Tutor",
        "Study Notes",
      ],
    },
    {
      name: "Pro",
      price: "₹199 / month",
      color: "border-cyan-400",
      features: [
        "Unlimited AI Chat",
        "Chat History",
        "Fast AI Responses",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      price: "₹499 / month",
      color: "border-yellow-400",
      features: [
        "Everything in Pro",
        "Voice Chat (Soon)",
        "Study Planner (Soon)",
        "PDF Chat (Soon)",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white px-5 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          Premium Plans
        </h1>

        <p className="text-center text-slate-400 mt-4">
          Choose the plan that's right for you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border ${plan.color} bg-slate-900 p-8`}
            >
              <h2 className="text-3xl font-bold">
                {plan.name}
              </h2>

              <p className="text-cyan-400 text-2xl mt-3 font-bold">
                {plan.price}
              </p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((item) => (
                  <li key={item}>
                    ✅ {item}
                  </li>
                ))}
              </ul>

              <button
                className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400"
              >
                Coming Soon
              </button>
            </div>
          ))}

        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-700 px-6 py-3 hover:border-cyan-400"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </main>
  );
}

export default Premium;