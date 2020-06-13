import Business from "../models/Business";

export const getBusiness = async ({user}) => {
  return Business.findOne({user})
}
