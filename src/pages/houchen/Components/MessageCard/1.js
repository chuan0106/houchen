const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
console.log(dayDiff(new Date('2023-10-07'), new Date('2023-10-19')))

const dayDiff1 = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
console.log(dayDiff1(new Date('2023-10-22'), new Date('2023-11-05')))
