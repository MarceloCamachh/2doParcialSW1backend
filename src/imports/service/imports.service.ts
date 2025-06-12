import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { AddSketchDto } from '../dto';
import { promptGrapesjs } from '../constant';
import { SketchResponse } from '../interface';

@Injectable()
export class ImportsService {
  private readonly logger = new Logger(ImportsService.name);
  private openAI: OpenAI;

  constructor(){
    try{
      const apiKey = process.env.OPENAI_API_KEY;
      this.openAI = new OpenAI({
        apiKey
      });
      this.logger.log("OpenAI client initialized successfully.");
    }catch (error) {
      this.logger.error("Failed to initialize OpenAI client", error);
    }
  }

  public async processSketchToHtml(addSketchDto: AddSketchDto): Promise<SketchResponse>{
    try{
      const base64Image = addSketchDto.sketch.buffer.toString('base64');
      this.logger.log("Processing sketch to HTML...");
      const processSketsGrapes =  await this.imageFromHtmlGrapesjs(base64Image);

      return processSketsGrapes;
    }catch(error){
      this.logger.error(`Error processing sketch to HTML: ${error.message}`);
      throw error;
    }
  }

  public async imageFromHtmlGrapesjs(basae64Image: string): Promise<SketchResponse>{
    try{
      if(!this.openAI){
        throw new Error("OpenAI client is not initialized");
      }
      const response = await this.openAI.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: promptGrapesjs
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${basae64Image}`
                }
              }
            ]
          }
        ],
        max_completion_tokens: 4000
      })
      console.log(response.choices[0].message.content!);
      const rawContent = response.choices[0].message.content!;
      const cleanContent = this.extractJsonFromMarkdown(rawContent);
      const parsedResponse: SketchResponse = JSON.parse(cleanContent);      
      return parsedResponse;

    }catch(error){

      this.logger.error(`Error al procesar el boceto con OpenAI: ${error.message}`);
      throw new BadRequestException(`Error al procesar el boceto: ${error.message}`);
    }
  }
  private extractJsonFromMarkdown(content: string): string {
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    return match ? match[1].trim() : content.trim();
  }
}
