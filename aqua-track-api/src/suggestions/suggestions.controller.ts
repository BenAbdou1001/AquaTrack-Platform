import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
@ApiTags('Suggestions')
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create a new suggestion' })
  @ApiBody({ type: CreateSuggestionDto })
  @ApiResponse({ status: 201, description: 'Suggestion created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid suggestion data.' })
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionsService.create(createSuggestionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a suggestion by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID ofthe suggestion' })
  @ApiResponse({ status: 200, description: 'Suggestion found.' })
  @ApiResponse({ status: 404, description: 'Suggestion not found.' })
  @Get()
  findAll() {
    return this.suggestionsService.findAll();
  }

  @ApiOperation({ summary: 'Get a suggestion by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the suggestion' })
  @ApiResponse({ status: 200, description: 'Suggestion found.' })
  @ApiResponse({ status: 404, description: 'Suggestion not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionsService.findOne(id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update a suggestion by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID ofthe suggestion to update' })
  @ApiBody({ type: UpdateSuggestionDto })
  @ApiResponse({ status: 200, description: 'Suggestion updated successfully.' })
  @ApiResponse({ status: 404, description: 'Suggestion not found.' })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuggestionDto: UpdateSuggestionDto,
  ) {
    return this.suggestionsService.update(id, updateSuggestionDto);
  }
  @ApiOperation({ summary: 'Delete a suggestion by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the suggestion to delete' })
  @ApiResponse({ status: 200, description: 'Suggestion deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Suggestion not found.' })
  @ApiResponse({ status: 400, description: 'Invalid delete request.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionsService.remove(id);
  }
}
