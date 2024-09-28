import { expect } from "chai";

const server = "https://gorest.co.in/public/v2";
const accessToken = process.env.GOREST_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error(
    "No token provided. Please set the GOREST_ACCESS_TOKEN environment variable.",
  );
}

const randomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const randomEmail = () => {
  return `${randomString(10)}@example.com`;
};

const randomGender = () => {
  return Math.random() < 0.5 ? "male" : "female";
};

const randomStatus = () => {
  return Math.random() < 0.5 ? "active" : "inactive";
};

describe("GoRest API Tests", () => {
  let userId;

  it("should create a new user", async () => {
    const randomName = randomString(8);
    const randomEmailAddress = randomEmail();
    const randomUserGender = randomGender();
    const randomUserStatus = randomStatus();

    const response = await fetch(`${server}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: randomName,
        email: randomEmailAddress,
        gender: randomUserGender,
        status: randomUserStatus,
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.have.property("id");
    userId = data.id;
  });

  it("should retrieve the created user", async () => {
    const response = await fetch(`${server}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("id").eql(userId);
  });

  it("should update the user", async () => {
    const response = await fetch(`${server}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Updated User",
        email: "updateduser@example.com",
        status: "inactive",
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("name").eql("Updated User");
  });

  it("should delete the user", async () => {
    const response = await fetch(`${server}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).to.equal(204);
  });

  it("should return 404 for the deleted user", async () => {
    const response = await fetch(`${server}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).to.equal(404);
  });

  it("should return 422 for missing fields", async () => {
    const response = await fetch(`${server}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Incomplete User",
      }),
    });

    expect(response.status).to.equal(422);
  });

  it("should return 422 for invalid email", async () => {
    const response = await fetch(`${server}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Invalid Email User",
        email: "invalid-email",
        gender: "male",
        status: "active",
      }),
    });

    expect(response.status).to.equal(422);
  });

  it("should return users with pagination", async () => {
    const response = await fetch(`${server}/users?page=1&per_page=5`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("array");
  });

  it("should retrieve user posts", async () => {
    const response = await fetch(`${server}/users/${userId}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("array");
  });
});
