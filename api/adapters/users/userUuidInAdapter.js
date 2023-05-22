export const userUuidInAdapter = async (user) => ({
  uuid: user.uuid,
  fullName: `${user.second_name} ${user.first_name} ${user.third_name}`,
});
