// this is the test spect for user model first i will create user then i use after all to delete the created user
import userModel from "../../models/userModel";

const userTest = new userModel();

type user = {
  id?: number;
  first_name: string;
  last_name: string;
  pass: string;
};

const testuser: user = {
  first_name: "ali1",
  last_name: "ali2",
  pass: "ali3",
};

describe("user model test", () => {
  it("Test create user", async () => {
    const usercreated = await userTest.create(testuser);
    expect(usercreated.first_name).toBe("ali1");
  });

  it("Test list users", async () => {
    const list = await userTest.listusers();
    expect(list.length).toBeGreaterThan(0);
  });

  it("Test find user by ID", async () => {
    const user = await userTest.findUserById(1);

    expect(user.id).toBe(1);
  });

  it("Test update user by ID", async () => {
    const newuser = {
      id: 1,
      first_name: "ali2",
      last_name: "ali2",
      pass: "ali3",
    };
    const user = await userTest.updateUser(newuser);

    expect(user.first_name).toBe("ali2");
  });

  it("Test delete user by ID", async () => {
    const newuser1 = {
      first_name: "ali2",
      last_name: "ali2",
      pass: "ali3",
    };
    const addeduser = await userTest.create(newuser1);
    const id = addeduser.id as number;
    const user = await userTest.deleteUser(id);
    console.log(addeduser);

    expect(user.first_name).toBe("ali2");
  });
});
