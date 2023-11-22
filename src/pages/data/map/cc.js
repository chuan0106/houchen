// function generateCoordinates (start, end, count)
// {
//     var coordinates = [];
//     var longitudeStep = (end[0] - start[0]) / (count + 1);
//     var latitudeStep = (end[1] - start[1]) / (count + 1);

//     for (var i = 1; i <= count; i++)
//     {
//         var longitude = start[0] + (longitudeStep * i);
//         var latitude = start[1] + (latitudeStep * i);
//         coordinates.push([longitude, latitude]);
//     }

//     return coordinates;
// }

// // 示例用法
// var start = [120.894, 32.014];
// var end = [120.912, 32.034];
// var count = 100;

// var generatedCoordinates = generateCoordinates(start, end, count);
// console.log(generatedCoordinates);



function generateCoordinates (start, end, count, controlPoints)
{
    var coordinates = [];
    var numSegments = controlPoints.length + 1;
    var segmentCount = Math.floor(count / numSegments);

    // 计算每个曲线段的起点和终点
    var segmentStart = start;
    var segmentEnd = controlPoints[0];

    for (var i = 0; i < numSegments; i++)
    {
        // 生成当前曲线段上的坐标点
        var segmentCoordinates = generateSegmentCoordinates(segmentStart, segmentEnd, segmentCount);
        coordinates = coordinates.concat(segmentCoordinates);

        // 更新下一个曲线段的起点和终点
        segmentStart = segmentEnd;
        segmentEnd = controlPoints[i + 1] || end;
    }

    return coordinates;
}

function generateSegmentCoordinates (start, end, count)
{
    var coordinates = [];
    var longitudeStep = (end[0] - start[0]) / (count + 1);
    var latitudeStep = (end[1] - start[1]) / (count + 1);

    for (var i = 1; i <= count; i++)
    {
        var longitude = start[0] + (longitudeStep * i);
        var latitude = start[1] + (latitudeStep * i);
        coordinates.push([longitude, latitude]);
    }

    return coordinates;
}

// 示例用法
var start = [120.894, 32.014];
var end = [120.912, 32.034];
var count = 100;
var controlPoints = [[120.9, 32.02], [120.905, 32.03]]; // 控制点用于模拟转弯

var generatedCoordinates = generateCoordinates(start, end, count, controlPoints);
console.log(generatedCoordinates);

