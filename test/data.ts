// DHT Error
export const error = {
    bencoded: "d1:eli201e23:A Generic Error Ocurrede1:t2:aa1:y1:ee",
    raw: { t: "aa", y: "e", e: [201, "A Generic Error Ocurred"] },
};

// DHT ping Query
export const pingQuery = {
    bencoded: "d1:ad2:id20:abcdefghij0123456789e1:q4:ping1:t2:aa1:y1:qe",
    raw: { t: "aa", y: "q", q: "ping", a: { id: "abcdefghij0123456789" } },
};
export const pingResponse = {
    bencoded: "d1:rd2:id20:mnopqrstuvwxyz123456e1:t2:aa1:y1:re",
    raw: { t: "aa", y: "r", r: { id: "mnopqrstuvwxyz123456" } },
};

// DHT find_node Query
export const findNodeQuery = {
    bencoded:
        "d1:ad2:id20:abcdefghij01234567896:target20:mnopqrstuvwxyz123456e1:q9:find_node1:t2:aa1:y1:qe",
    raw: {
        a: { id: "abcdefghij0123456789", target: "mnopqrstuvwxyz123456" },
        q: "find_node",
        t: "aa",
        y: "q",
    },
};
export const findNodeResponse = {
    bencoded:
        "d1:rd2:id20:0123456789abcdefghij5:nodes9:def456...e1:t2:aa1:y1:re",
    raw: {
        r: { id: "0123456789abcdefghij", nodes: "def456..." },
        t: "aa",
        y: "r",
    },
};

// DHT get_peers Query
export const getPeersQuery = {
    bencoded:
        "d1:ad2:id20:abcdefghij01234567899:info_hash20:mnopqrstuvwxyz123456e1:q9:get_peers1:t2:aa1:y1:qe",
    raw: {
        a: { id: "abcdefghij0123456789", info_hash: "mnopqrstuvwxyz123456" },
        q: "get_peers",
        t: "aa",
        y: "q",
    },
};
export const getPeersResponse = {
    bencoded:
        "d1:rd2:id20:abcdefghij01234567895:token8:aoeusnth6:valuesl6:axje.u6:idhtnmee1:t2:aa1:y1:re",
    raw: {
        r: {
            id: "abcdefghij0123456789",
            token: "aoeusnth",
            values: ["axje.u", "idhtnm"],
        },
        t: "aa",
        y: "r",
    },
};
export const getPeersClosetNodeResponse = {
    bencoded:
        "d1:rd2:id20:abcdefghij01234567895:nodes9:def456...5:token8:aoeusnthe1:t2:aa1:y1:re",
    raw: {
        r: {
            id: "abcdefghij0123456789",
            nodes: "def456...",
            token: "aoeusnth",
        },
        t: "aa",
        y: "r",
    },
};

// DHT announce_peers Query
export const announcePeersQuery = {
    bencoded:
        "d1:ad2:id20:abcdefghij012345678912:implied_porti1e9:info_hash20:mnopqrstuvwxyz1234564:porti6881e5:token8:aoeusnthe1:q13:announce_peer1:t2:aa1:y1:qe",
    raw: {
        a: {
            id: "abcdefghij0123456789",
            implied_port: 1,
            info_hash: "mnopqrstuvwxyz123456",
            port: 6881,
            token: "aoeusnth",
        },
        q: "announce_peer",
        t: "aa",
        y: "q",
    },
};
export const announcePeersResponse = {
    bencoded: "d1:rd2:id20:mnopqrstuvwxyz123456e1:t2:aa1:y1:re",
    raw: { t: "aa", y: "r", r: { id: "mnopqrstuvwxyz123456" } },
};
