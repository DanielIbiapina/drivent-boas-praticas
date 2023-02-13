import { notFoundError, roomIsFullError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }

  const room = await bookingRepository.findBookingByRoomId(roomId);
  if (room) {
    throw roomIsFullError();
  }
  const booking = await bookingRepository.createBooking(userId, roomId);

  return booking;
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  const bookingExist = await bookingRepository.findBooking(userId);
  if (!bookingExist) {
    throw notFoundError();
  }
  const booking = await bookingRepository.updateBooking(roomId, bookingId);

  return booking;
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking,
};

export default bookingService;
