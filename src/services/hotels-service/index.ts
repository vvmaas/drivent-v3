import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels() {
  const hotels = await hotelsRepository.getHotelList();
  
  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotel(id: number) {
  const hotel = await hotelsRepository.getHotelById(id);
    
  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelsService = { 
  getHotels,
  getHotel
};

export default hotelsService;
