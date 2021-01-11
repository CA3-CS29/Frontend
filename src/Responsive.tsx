import { useMediaQuery } from 'react-responsive';


export const IsPhone = () => (
    useMediaQuery({maxWidth: 600})
)

export const IsTabletPortrait = () => (
    useMediaQuery({minWidth: 601, maxWidth: 900})
)

export const IsTabletLandscape = () => (
    useMediaQuery({minWidth: 901, maxWidth: 1200})
)

export const IsDesktop = () => (
    useMediaQuery({minWidth: 1201})
)


export const Phone = ({ children }: any) => (
    IsPhone() ? children : null
)

export const TabletPortrait = ({ children }: any) => (
    IsTabletPortrait() ? children : null
)

export const TabletLandscape = ({ children }: any) => (
    IsTabletLandscape() ? children : null
)

export const Desktop = ({ children }: any) => (
    IsDesktop() ? children : null
)