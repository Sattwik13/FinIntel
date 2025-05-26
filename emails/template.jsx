import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Percent } from "lucide-react";
import * as React from "react";

export default function EmailTemplate({

    userName = "",
    type = "budget-alert",
    data = {}
}) {
    if(type === "monthly-report") {

    }
    if(type === "budget-alert") {
      return (
       <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.percent}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used <span style={styles.percent}>{data?.percentageUsed.toFixed(1)}%</span> of your
              monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>${data?.budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>${data?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  ${data?.budgetAmount - data?.totalExpenses}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
       </Html>
      ); 
    }
}

const styles = {
    body: {
        backgroundColor: "#111111", // slate-900
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        color: "#e2e8f0", // slate-200
        padding: "40px 0",
    },
    container: {
        backgroundColor: "#111111", // slate-800
        margin: "0 auto",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        maxWidth: "600px",
    },
    title: {
        color: "#ffffff", // slate-50
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        margin: "0 0 20px",
    },
    heading: {
        color: "#f9fafb", // slate-100
        fontSize: "18px",
        fontWeight: "600",
        margin: "0 0 12px",
    },
    text: {
        color: "#d1d5db", // slate-400
        fontSize: "16px",
        margin: "0 0 16px",
        lineHeight: "1.6",
    },
    percent: {
        color: "#cbd5e1", // slate-400
        fontWeight: "bold",
        fontSize: "18px",
        margin: "0 0 16px",
        lineHeight: "1.6",
    },
    section: {
        marginTop: "32px",
        padding: "20px",
        backgroundColor: "#f9fafb",
        borderRadius: "5px",
        border: "1px solid #e5e7eb",
    },
    statsContainer: {
        margin: "32px 0",
        padding: "16px",
        backgroundColor: "#1a1a1a", // slate-700
        borderRadius: "6px",
    },
    stat: {
        marginBottom: "12px",
        padding: "16px",
        backgroundColor: "#0f0f0f", // slate-800
        borderRadius: "6px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    },
}