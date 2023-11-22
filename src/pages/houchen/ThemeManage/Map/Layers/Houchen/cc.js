
function generateCoordinates (start, end, count, controlPoints)
{
    var coordinates = [];
    var numSegments = controlPoints.length + 1;
    var totalDistance = calculateDistance(start, end);
    var segmentDistances = [];
    var segmentCounts = [];

    // 计算每个曲线段的长度和坐标点数量
    for (var i = 0; i < numSegments; i++)
    {
        var segmentStart = controlPoints[i - 1] || start;
        var segmentEnd = controlPoints[i] || end;
        var segmentDistance = calculateDistance(segmentStart, segmentEnd);
        var segmentCount = Math.floor((segmentDistance / totalDistance) * count);

        segmentDistances.push(segmentDistance);
        segmentCounts.push(segmentCount);
    }

    // 生成每个曲线段上的坐标点
    for (var i = 0; i < numSegments; i++)
    {
        var segmentStart = controlPoints[i - 1] || start;
        var segmentEnd = controlPoints[i] || end;
        var segmentCount = segmentCounts[i];
        var segmentCoordinates = generateSegmentCoordinates(segmentStart, segmentEnd, segmentCount);
        coordinates = coordinates.concat(segmentCoordinates);
    }

    return coordinates;
}

function calculateDistance (point1, point2)
{
    var lon1 = point1[0];
    var lat1 = point1[1];
    var lon2 = point2[0];
    var lat2 = point2[1];

    // 使用简化的球面三角法计算两点之间的距离
    var R = 6371; // 地球半径（单位：km）
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;

    return distance;
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
var start = [115.40659452710702, 33.879357162150356];
var end = [115.48629, 33.86727];
var count = 500;
var controlPoints = [
    [115.40659452710702, 33.870751180754155],
    [115.4103752318644, 33.87009330957396],
]; // 减少控制点的数量

var generatedCoordinates = generateCoordinates(start, end, count, controlPoints);

console.log(generatedCoordinates.length);