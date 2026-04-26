const problems  = [
    {
        id: 1,
        question: "Find the derivatives of x³.",
        answer: "3x^2",
        steps: [
            {
                id: 1,
                type: "concept",
                prompt: "What rule do we use when differentiating x?",
                answer: "power rule",
                hint: "Think about the rule that brings the exponent down front."
            },
            {
                id: 2,
                type: "input",
                prompt: "What does the exponent become after multiplying the rule?",
                answer: "3",
                hint: "The exponent multiplies to the front as a coefficient."
            },
            {
                id: 3,
                type: "input",
                prompt: "Now write the full derivatives.",
                answer: "3x^2",
                hint: "Multiply the coefficient by, then reduce the exponent by 1."
            }
        ]
    },
    {
        id: 2,
        question: "Find the derivatives of x⁵.",
        answer: "5x^4",
        steps: [
            {
                id: 1,
                type: "concept",
                prompt: "What rule do we use when differentiating x?",
                answer: "power rule",
                hint: "Think about the rule that brings the exponents down front."
            },
            {
                id: 2,
                type: "input",
                prompt: "What does the exponent become after multiplying the rule?",
                answer: "5",
                hint: "The exponent multiplies to the front of as a coefficient."
            },
            {
                id: 3,
                type: "input",
                prompt: "Now write the full derivatives.",
                answer: "5x^4",
                hint: "Multiply the coefficient by, then reduce the exponent by 1."
            }
        ]
    },
    {
        id: 3,
        question: "Find the derivatives of x².",
        answer: "2x",
        steps: [
            {
                id: 1,
                type: "concept",
                prompt: "What rule do we use when differentiating x?",
                answer: "power rule",
                hint: "Think about the rule that brings the exponents down front."
            },
            {
                id: 2,
                type: "input",
                prompt: "What does the exponent become after multiplying the rule?",
                answer: "2",
                hint: "The exponent multiplies to the front of as a coefficient."
            },
            {
                id: 3,
                type: "input",
                prompt: "Now write the full derivatives.",
                answer: "2x",
                hint: "Multiply the coefficient by, then reduce the exponent by 1."
            }
        ]
    }
]

export default problems