import { CgGym, CgHomeAlt, CgProfile, CgSmartHomeBoiler } from 'react-icons/cg'
import { IoMdCafe } from 'react-icons/io'
import { FaUtensils } from 'react-icons/fa6'
import { FaParking, FaPray, FaSwimmingPool } from 'react-icons/fa'

export const featuresLabel: { id: number; label: string; icon: React.ComponentType<any> }[] = [
    { id: 1, label: 'Elevators', icon: CgHomeAlt },
    { id: 2, label: 'Kitchen', icon: FaUtensils },
    { id: 3, label: 'Gym', icon: CgGym },
    { id: 4, label: 'Pool', icon: FaSwimmingPool },
    { id: 5, label: 'Kids Area', icon: CgProfile },
    { id: 6, label: 'Landscape', icon: CgSmartHomeBoiler },
    { id: 7, label: 'Mosque', icon: FaPray },
    { id: 8, label: 'Fully Finished', icon: CgSmartHomeBoiler },
    { id: 9, label: 'Semi Finished', icon: CgSmartHomeBoiler },
    { id: 10, label: 'Jacuzzi', icon: FaSwimmingPool },
    { id: 11, label: 'Central AC', icon: CgSmartHomeBoiler },
    { id: 12, label: 'Smart Home System', icon: CgSmartHomeBoiler },
    { id: 13, label: 'Parking', icon: FaParking },
    { id: 14, label: 'Cafeteria', icon: IoMdCafe },
    { id: 15, label: 'Sea/Garden View', icon: CgHomeAlt },
    { id: 16, label: 'special location', icon: CgHomeAlt },
];