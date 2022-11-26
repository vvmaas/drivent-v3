import { prisma } from "@/config";

async function getHotelList() {
  return await prisma.hotel.findMany();
}

async function getHotelById(id: number) {
  return prisma.hotel.findUnique({ where: { id }, include: { Rooms: true } });
}

const hotelsRepository = {
  getHotelList,
  getHotelById
};
  
export default hotelsRepository;
