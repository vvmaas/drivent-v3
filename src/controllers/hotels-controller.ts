import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketService.getTicketByUserId(userId);

    if(!ticket || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false || ticket.status === "RESERVED") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const hotels = await hotelsService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  const id = Number(hotelId);

  try {
    if (!hotelId || isNaN(id)) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const rooms = hotelsService.getHotelRooms(id);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
