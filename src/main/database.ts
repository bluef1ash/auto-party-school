/**
 * 打开 indexedDB 数据库
 * @param {object} databaseName 数据库名称
 * @param {string} storeName 仓库名称
 * @param {object} data 新增的数据
 */
const handleOpenDB = (databaseName: string, storeName: string, callback: Function, version = 1): Promise<T> => {
    return new Promise((resolve: Function) => {
        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.indexedDB;
        const request = indexedDB.open(databaseName, version);
        request.onsuccess = (event: Event): void => {
            resolve((<EventTarget>event.target).result);
        };
        request.onerror = (): void => {
            Notification.error({
                message: "程序出现错误, 请联系管理员",
                placement: "bottomRight",
                duration: 2.5
            });
        };
        request.onupgradeneeded = (event: Event): void => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                const objectStore = db.createObjectStore(storeName, { keyPath: "id" });
                callback && callback(objectStore);
                // objectStore.createIndex("workerId", "workerId", { unique: false });
            }
        };
    });
};
/**
 * 获取全部数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
const readAll = (db, storeName) => {
    const list = [];
    const objectStore = db.transaction(storeName).objectStore(storeName);
    objectStore.openCursor().onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
            list.push(cursor.value);
            cursor.continue();
        } else {
            setData(list);
        }
    };
};
export { handleOpenDB, readAll };
