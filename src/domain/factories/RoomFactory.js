const Room = require('../entities/Room');

class RoomFactory {
    static fromScrapedData(rawData) {
        const rawPrice = rawData.price?.trim() || '0';
        const numericPrice = parseFloat(
            rawPrice
                .replace(/R\$\s*/, '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim()
        );

        return new Room({
            name: rawData.name?.trim() || '',
            description: rawData.description?.trim() || '',
            price: isNaN(numericPrice) ? 0 : numericPrice,
            image: rawData.image?.trim() || ''
        });
    }

    static fromScrapedDataArray(rawDataArray) {
        if (!Array.isArray(rawDataArray)) {
            return [];
        }

        return rawDataArray
            .map(data => {
                try {
                    return this.fromScrapedData(data);
                } catch (error) {
                    console.error('Validation failed for room data:', data, 'Error object:', error);
                    return null
                }   
            })
            .filter(room => room !== null);
    }
}

module.exports = RoomFactory;