export const changeEnumToArray = (e: any) => {
    const array = Object.values(e);
    return array.filter((e, id) => {
        if (id < array.length / 2)
            return true;
        return false;
    });
}