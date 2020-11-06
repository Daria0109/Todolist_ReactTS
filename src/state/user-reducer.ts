export type StateType = {
  name: string
  age: number
  childrenCount: number
}

type ActionType = {
  type: string
  name?: string
    }
export const userReducer = (user: StateType, action: ActionType) => {
  switch (action.type) {
    case("INCREMENT-AGE"):
      return {
        ...user,
        age: user.age + 1
      };
    case("INCREMENT-CHILDREN-COUNT"):
      return {
        ...user,
        childrenCount: user.childrenCount+1
    }
    case("CHANGE-NAME"):
      return {
        ...user,
        name: action.name
      }
    default:
      throw new Error("I don't understand this type");
  }
}