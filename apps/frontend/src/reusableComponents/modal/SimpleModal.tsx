import { Box, Modal } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'

export interface SimpleModalProps {
    open: boolean
    onClose: () => void
    width?: string | number
}

export const SimpleModal = observer<PropsWithChildren<SimpleModalProps>>(
    ({ onClose, open, children, width = 400 }) => {
        return (
            <Modal
                open={open}
                onClose={onClose}
                sx={{
                    backdropFilter: 'blur(3px)',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        outline: 0,
                    }}
                >
                    {children}
                </Box>
            </Modal>
        )
    }
)
