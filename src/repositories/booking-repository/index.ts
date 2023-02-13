import { prisma } from '@/config';

export async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    select: { id: true, Room: true },
    where: {
      userId,
    },
  });
}

export async function findBookingByRoomId(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId,
    },
  });
}

export async function createBooking(roomId: number, userId: number) {
  console.log('user id chegou ' + userId);
  const booking = await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
  return { bookingId: booking.id };
}

export async function updateBooking(roomId: number, bookingId: number) {
  const newBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
  return { bookingId: newBooking.id };
}

const bookingRepository = {
  findBooking,
  findBookingByRoomId,
  createBooking,
  updateBooking,
};

export default bookingRepository;
