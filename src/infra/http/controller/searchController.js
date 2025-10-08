const SearchUseCase = require('../../../application/usecases/SearchUsecase');
const ValidationError = require('../../../domain/errors/ValidationError');
const AppError = require('../../../domain/errors/AppError');

class SearchController {
    constructor({searchUseCase, logger}) {
      this.searchUseCase = searchUseCase;
      this.logger = logger;
      this.handle = this.handle.bind(this);
    }
  
    async handle(request, response) {
      try {
        const { checkin, checkout } = request.body;

        const query = { checkin, checkout };
  
        const result = await this.searchUseCase.execute(query);
  
        return response.status(200).json(result);
      } catch (error) {
        this.logger.error({ err: error }, 'Error in SearchController');

        if (error instanceof ValidationError) {
            return response.status(400).json({ message: error.message });
        }
        
        if (error instanceof AppError) {
            return response.status(error.statusCode || 500).json({ message: error.message });
        }

        return response.status(500).json({
            message: 'Internal Server Error.'
        });
      }
    }
  }
  
  module.exports =  SearchController;