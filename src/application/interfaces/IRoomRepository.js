class IRoomRepository {
    async findAvailableRooms(dateRange) {
      throw new Error('Method findAvailableRooms must be implemented');
    }
  
}
  
module.exports = IRoomRepository;