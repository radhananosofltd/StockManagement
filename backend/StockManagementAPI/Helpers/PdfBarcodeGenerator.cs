using System.Collections.Generic;
using System.IO;
using ZXing;
using ZXing.Common;
using ZXing.Rendering;
using SkiaSharp;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace StockManagementAPI.Helpers
{
    public static class PdfBarcodeGenerator
    {
        public static byte[] GenerateBarcodesPdf(List<(string Id, string Barcode)> barcodes)
        {
            try
            {
                return Document.Create(container =>
                {
                    container.Page(page =>
                    {
                        page.Size(PageSizes.A4);
                        page.Margin(20);
                        page.Content().Column(col =>
                        {
                            foreach (var (id, barcode) in barcodes)
                            {
                                col.Item().Text($"ID: {id}");
                                // Generate barcode image
                                var writer = new BarcodeWriterPixelData
                                {
                                    Format = BarcodeFormat.CODE_128,
                                    Options = new EncodingOptions
                                    {
                                        Height = 180,
                                        Width = 100,
                                        Margin = 2
                                    }
                                };
                                var pixelData = writer.Write(barcode);
                                using var bitmap = new SKBitmap(pixelData.Width, pixelData.Height, SKColorType.Rgba8888, SKAlphaType.Premul);
                                pixelData.Pixels.CopyTo(bitmap.GetPixelSpan());
                                using var image = SKImage.FromBitmap(bitmap);
                                using var ms = new MemoryStream();
                                image.Encode(SKEncodedImageFormat.Png, 100).SaveTo(ms);
                                col.Item().Row(row =>
                                {
                                    row.ConstantItem(100).Height(180).Image(ms.ToArray(), ImageScaling.FitWidth);
                                });
                            }
                        });
                    });
                }).GeneratePdf();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating barcode PDF: {ex.Message}");
                return null;
            }
        }
    }
}
