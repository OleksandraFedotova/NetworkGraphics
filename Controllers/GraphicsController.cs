using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Newtonsoft.Json;

namespace TrafiicAnalizer.Controllers
{
    [Produces("application/json")]
    [Route("api/Graphics")]
    public class GraphicsController : Controller
    {

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Graphics(IFormFileCollection filesDownloaded)
        {
            filesDownloaded = Request.Form.Files;
            List<string[]> files = new List<string[]>();
            var chart = new Dictionary<string, Dictionary<string, List<string>>>();

            foreach (IFormFile f in filesDownloaded)
            {
                var oneFileString = string.Empty;
                using (var reader = new StreamReader(f.OpenReadStream()))
                {
                    oneFileString = reader.ReadToEnd();
                }

                if (!string.IsNullOrEmpty(oneFileString))
                {
                    files.Add(oneFileString.Split('\n'));
                }


                /* string[] firstFile = System.IO.File.ReadAllLines("Результат номер 1.txt");
                 string[] secondFile = System.IO.File.ReadAllLines("Результат номер 2.txt");
                 string[] thirdFile = System.IO.File.ReadAllLines("Результат номер 3.txt");
                 string[] fourthFile = System.IO.File.ReadAllLines("Результат номер 4.txt");

                 List<string[]> files = new List<string[]>();

                 files.Add(firstFile);
                 files.Add(secondFile);
                 files.Add(thirdFile);
                 files.Add(fourthFile);
                 */

               
                foreach (string[] file in files)
                {
                    for (int i = 0; i < file.Length;)
                    {
                        if (file[i].Contains("Flow number"))
                        {
                            string[] checkValueOfFlow = file[i].Split(':');
                            var numberofCurrentFlow = checkValueOfFlow[1];

                            while (!file[i].Contains('='))
                            {
                                i++;
                            }

                            while (file[i].Contains('='))
                            {
                                string[] valueOfParam = file[i].Split('=');

                                if (!chart.ContainsKey(valueOfParam[0]))
                                {
                                    chart.Add(valueOfParam[0], new Dictionary<string, List<string>>());
                                }

                                if (!chart[valueOfParam[0]].ContainsKey(numberofCurrentFlow))
                                {
                                    chart[valueOfParam[0]].Add(numberofCurrentFlow, new List<string>());
                                }

                                chart[valueOfParam[0]][numberofCurrentFlow].Add(valueOfParam[1]);

                                i++;
                            }
                        }
                        else
                        {
                            i++;
                        }
                    }

                }
              
            }

            return Ok(chart);
        }
    }
}
