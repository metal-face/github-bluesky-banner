import { BskyAgent } from "@atproto/api";
import sharp from "sharp";

const bskyUser = process.env.X_BSKY_USERNAME;
const bskyPass = process.env.X_BSKY_PASSWORD;
const githubUser = process.env.X_GITHUB_USERNAME;

if (!bskyUser || !bskyPass || !githubUser) {
    throw new Error(
        "Missing required environment variables: X_BSKY_USERNAME, X_BSKY_PASSWORD, X_GITHUB_USERNAME",
    );
}

const agent = new BskyAgent({
    service: "https://bsky.social",
});

await agent.login({
    identifier: bskyUser,
    password: bskyPass,
});

const githubCommitGraph = await fetch(`https://ghchart.rshah.org/2dba4e/${githubUser}`);

if (!githubCommitGraph.ok) {
    throw new Error(
        `Failed to fetch GitHub commit graph for user ${githubUser}: ${githubCommitGraph.statusText}`,
    );
}

const svgBuffer = Buffer.from(await githubCommitGraph.arrayBuffer());

const pngGraph = await sharp(svgBuffer).resize(1500, 500).png().toBuffer();

await agent.upsertProfile(async (existingProfile) => {
    if (!existingProfile) {
        throw new Error("Failed to fetch existing profile");
    }

    const { data } = await agent.uploadBlob(pngGraph, { encoding: "image/png" });

    existingProfile.banner = data.blob;

    return existingProfile;
});
