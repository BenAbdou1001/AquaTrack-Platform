import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Review created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid review data.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.ReviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all reviews' })
  @ApiResponse({
    status: 200,
    description: 'List of reviews retrieved successfully.',
  })
  findAll() {
    return this.ReviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific review by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the review' })
  @ApiResponse({ status: 200, description: 'Review retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  findOne(@Param('id') id: string) {
    return this.ReviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing review' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the review to update',
  })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: 'Review updated successfully.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.ReviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the review to delete',
  })
  @ApiResponse({ status: 200, description: 'Review deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  remove(@Param('id') id: string) {
    return this.ReviewsService.remove(id);
  }
}
