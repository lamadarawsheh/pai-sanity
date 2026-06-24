import { describe, it, expect } from "vitest";
import { sanityClient } from "../client/src/lib/sanity";

describe("Sanity.io API Integration", () => {
  it("should successfully connect to Sanity with valid credentials", async () => {
    try {
      // Test the connection by fetching a simple count of documents
      const query = `count(*[_type == "blogPost"])`;
      const result = await sanityClient.fetch(query);

      // If we get here without error, the connection is successful
      expect(result).toBeDefined();
      expect(typeof result).toBe("number");
      console.log(`✓ Sanity connection successful. Found ${result} blog posts.`);
    } catch (error: any) {
      console.error("✗ Sanity connection failed:", error.message);
      throw new Error(`Sanity API connection failed: ${error.message}`);
    }
  });

  it("should have the correct project ID configured", async () => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    expect(projectId).toBe("uyvd607s");
  });

  it("should have the correct dataset configured", async () => {
    const dataset = import.meta.env.VITE_SANITY_DATASET;
    expect(dataset).toBe("production");
  });

  it("should have API token configured", async () => {
    const apiToken = import.meta.env.SANITY_API_TOKEN;
    expect(apiToken).toBeDefined();
    expect(apiToken?.length).toBeGreaterThan(0);
  });
});
