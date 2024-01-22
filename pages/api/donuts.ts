// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { HTTPMethod } from 'http-method-enum';
import { dbClient } from '../../utils';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    switch (req.method) {
        case HTTPMethod.POST: {
            dbClient.donut.create(req.body);
        }
    }
}