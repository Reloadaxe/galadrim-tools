import { WorkplaceSvgRoom } from '../reusableComponents/WorkplaceSvg/WorkplaceSvg'

export const RESERVABLE_ROOMS = [
    'Adier',
    'Coffre',
    'Kitchen',
    'Manguier',
    'Turing',
    'Vador',
    'PhoneBox'
] as const

export type ReservableWorkplaceSvgRoom = typeof RESERVABLE_ROOMS[number]

export type RoomFullName = typeof AllRooms[number]['name']

export const AllRooms = [
    {
        name: '*',
    },
    {
        name: 'Salle Vador',
    },
    {
        name: 'Salle Adier',
    },
    {
        name: 'Salle Turing',
    },
    {
        name: 'Salle manguier massif',
    },
    {
        name: 'Salle du coffre',
    },
    {
        name: 'Cuisine',
    },
    {
        name: 'Phone box',
    },
] as const

const WorkplaceSvgRoomToFullRoomName: {
    [K in ReservableWorkplaceSvgRoom]: RoomFullName
} = {
    Adier: 'Salle Adier',
    Coffre: 'Salle du coffre',
    Kitchen: 'Cuisine',
    Manguier: 'Salle manguier massif',
    Vador: 'Salle Vador',
    Turing: 'Salle Turing',
    PhoneBox: 'Phone box',
}

export function isReservableRoom(room: WorkplaceSvgRoom): room is ReservableWorkplaceSvgRoom {
    return RESERVABLE_ROOMS.includes(room as ReservableWorkplaceSvgRoom)
}

export function getReservableRoomFullName(room: WorkplaceSvgRoom) {
    if (!isReservableRoom(room)) {
        return null
    }
    return WorkplaceSvgRoomToFullRoomName[room]
}
