import { Box, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { SaveurStore, MAX_ZOOM } from '../../../globalStores/SaveurStore'

export const RestaurantResults = observer<{ saveurStore: SaveurStore }>(({ saveurStore }) => {
    const pattern = saveurStore.restaurantsStore.search
    const searchResults = saveurStore.restaurantsStore.fuseInstance
        .search(pattern, { limit: 5 })
        .filter(({ score }) => score && score < 0.5)

    if (searchResults.length === 0) {
        return null
    }

    return (
        <Box
            sx={{
                bgcolor: 'white',
                mb: 1,
                p: 1,
                borderRadius: '4px',
            }}
        >
            {searchResults.map(({ item: resto }) => (
                <Button
                    key={resto.id}
                    sx={{ display: 'block', textTransform: 'none' }}
                    onClick={() => {
                        saveurStore.flyToRestaurant(resto)
                    }}
                >
                    {resto.name}
                </Button>
            ))}
        </Box>
    )
})
