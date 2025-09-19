#Stage 1 : Build Stage
FROM node:current-alpine3.22 AS build

#Set working directory
WORKDIR /app

#Copy dependency files
COPY package*.json ./

RUN npm ci

COPY . .

#Stage 2 : Run Stage
FROM node:current-alpine3.22 

WORKDIR /app

#Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

#Copy built-code and dependencies
COPY --from=build /app .

# #Set permissions
# RUN chown -R appuser:appgroup /app && \
#     chmod -R 775 /app && \
#     chmod +x /app/index.js

USER appuser

EXPOSE 8080

CMD ["node" , "index.js"]
